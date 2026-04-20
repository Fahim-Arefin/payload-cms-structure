'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export type CountryOption = {
  name: string
  code: string
  flag: string
  dialCode: string
  flagSvg: string
}

type CountrySelectFieldProps = {
  id: string
  label: string
  value: string
  onChange: (countryCode: string, country?: CountryOption) => void
  error?: string
  required?: boolean
  placeholder?: string
}

export function CountrySelectField({
  id,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder = 'Select country',
}: CountrySelectFieldProps) {
  const [open, setOpen] = useState(false)
  const [countries, setCountries] = useState<CountryOption[]>([])
  const [loading, setLoading] = useState(true)

  const isInvalid = Boolean(error)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag,flags',
        )
        const data = await response.json()

        const mapped: CountryOption[] = data
          .map((country: any) => {
            const root = country?.idd?.root || ''
            const suffix = country?.idd?.suffixes?.[0] || ''

            return {
              name: country?.name?.common || '',
              code: country?.cca2 || '',
              flag: country?.flag || '',
              dialCode: root && suffix ? `${root}${suffix}` : '',
              flagSvg: country?.flags?.svg || country?.flags?.png || '',
            }
          })
          .filter((country: CountryOption) => country.name && country.code)
          .sort((a: CountryOption, b: CountryOption) => a.name.localeCompare(b.name))

        setCountries(mapped)
      } catch (err) {
        console.error('Failed to fetch countries', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  const selectedCountry = useMemo(
    () => countries.find((country) => country.code === value),
    [countries, value],
  )

  return (
    <Field {...(isInvalid ? { 'data-invalid': true } : {})}>
      <FieldLabel htmlFor={id} className="font-manrope font-bold text-dark-1 global-p5">
        {label}
        {required ? ' *' : ''}
      </FieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={isInvalid || undefined}
            className={cn(
              'w-full justify-between rounded-none border-[1.5px] border-cyan bg-white/10 text-left',
              'font-manrope global-p5 text-dark-1',
              'p-2 lg:p-3 xl:p-4 2xl:p-5',
              'hover:bg-white/10',
              'focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#686893] focus-visible:ring-offset-0 focus-visible:border-[#686893]',
              !selectedCountry && 'text-[#07072580]',
            )}
          >
            <span className="flex min-w-0 items-center gap-2 truncate">
              {selectedCountry ? (
                <>
                  <span className="relative h-4 w-6 shrink-0 overflow-hidden rounded-[2px] border border-black/10 shadow-sm">
                    {selectedCountry.flagSvg ? (
                      <Image
                        src={selectedCountry.flagSvg}
                        alt={`${selectedCountry.name} flag`}
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-base leading-none">{selectedCountry.flag}</span>
                    )}
                  </span>

                  <span className="truncate">{selectedCountry.name}</span>

                  {selectedCountry.dialCode ? (
                    <span className="shrink-0 text-[#07072580]">({selectedCountry.dialCode})</span>
                  ) : null}
                </>
              ) : (
                <span>{loading ? 'Loading countries...' : placeholder}</span>
              )}
            </span>

            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[var(--radix-popover-trigger-width)] rounded-none p-0">
          <Command>
            <CommandInput placeholder="Search country..." className="font-manrope" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>

              <CommandGroup>
                {countries.map((country) => (
                  <CommandItem
                    key={country.code}
                    value={`${country.name} ${country.code} ${country.dialCode}`}
                    onSelect={() => {
                      onChange(country.code, country)
                      setOpen(false)
                    }}
                    className="font-manrope"
                  >
                    <span className="relative mr-2 h-4 w-6 shrink-0 overflow-hidden rounded-sm border border-gray-200">
                      {country.flagSvg ? (
                        <Image
                          src={country.flagSvg}
                          alt={`${country.name} flag`}
                          fill
                          sizes="24px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-base leading-none">{country.flag}</span>
                      )}
                    </span>

                    <span className="flex-1 truncate">{country.name}</span>

                    {country.dialCode ? (
                      <span className="mr-2 text-[#07072580]">{country.dialCode}</span>
                    ) : null}

                    <Check
                      className={cn(
                        'ml-auto size-4',
                        value === country.code ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <FieldDescription className="font-manrope text-red-500 global-p5 min-h-5">
          {error}
        </FieldDescription>
      )}
    </Field>
  )
}
