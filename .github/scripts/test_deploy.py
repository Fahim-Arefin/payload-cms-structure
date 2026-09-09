"""Run with python3 .github/scripts/test_deploy.py; no registry access required."""
import os
from pathlib import Path
import re
import subprocess
import tempfile
import textwrap

workflow = (Path(__file__).resolve().parents[1] / 'workflows/deploy.yml').read_text()


def script(name):
    step = workflow.split(f'      - name: {name}\n', 1)[1].split('\n      - name:', 1)[0]
    return textwrap.dedent(step.split('        run: |\n', 1)[1])


with tempfile.TemporaryDirectory() as directory:
    root = Path(directory)
    (root / '.deploy').mkdir()
    env = dict(os.environ, REGISTRY='registry.example', IMAGE_NAME='website',
               GITHUB_SHA='a' * 40, GITHUB_REF_NAME='main',
               GITHUB_OUTPUT=str(root / 'output'), CALLS=str(root / 'calls'))

    def metadata(branch='main', sha='a' * 40, contents='VALUE=one\n'):
        env.update(GITHUB_REF_NAME=branch, GITHUB_SHA=sha)
        (root / '.deploy/runtime.env').write_text(contents)
        (root / 'output').write_text('')
        subprocess.run(['bash', '-c', script('Compute image tags')], cwd=root, env=env, check=True)
        return dict(line.split('=', 1) for line in (root / 'output').read_text().splitlines())

    original = metadata()
    assert metadata() == original
    assert metadata(branch='staging')['build_tag'] != original['build_tag']
    assert metadata(sha='b' * 40)['build_tag'] != original['build_tag']
    assert metadata(contents='VALUE=two\n')['build_tag'] != original['build_tag']
    metadata()

    # Execute the actual workflow shell, replacing only external Docker operations.
    docker = root / 'docker'
    docker.write_text('''#!/bin/bash
printf '%s\\n' "$*" >> "$CALLS"
case "$1" in
  manifest) exit "$MANIFEST_STATUS" ;;
  pull) exit "$PULL_STATUS" ;;
esac
''')
    docker.chmod(0o755)
    env['PATH'] = f'{root}:{env["PATH"]}'
    build = re.sub(r'\$\{\{ steps\.meta\.outputs\.(\w+) \}\}',
                   lambda match: original[match[1]], script('Build or reuse Docker image'))
    for manifest_status, pull_status in [('0', '0'), ('1', '0'), ('0', '1')]:
        (root / 'calls').write_text('')
        env.update(MANIFEST_STATUS=manifest_status, PULL_STATUS=pull_status)
        result = subprocess.run(['bash', '-c', build], cwd=root, env=env)
        calls = (root / 'calls').read_text().splitlines()
        assert (result.returncode == 0) == (pull_status == '0')
        assert any(call.startswith('build ') for call in calls) == (manifest_status == '1')
        assert any(call.startswith('pull ') for call in calls) == (manifest_status == '0')
        assert any(call.startswith('tag ') for call in calls) == (pull_status == '0')

print('PASS: stable identity; branch/commit/env invalidation; reuse; build; pull failure')
