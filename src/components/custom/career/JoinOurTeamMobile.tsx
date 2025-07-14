import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import CareerOpeningForm from './CareerOpeningForm'
import { Button } from '@/components/ui/button'

export function JoinOurTeamMobile() {
  return (
    <div className="block md:hidden">
      <div className="rounded-xl bg-white py-10 px-4 flex items-center justify-center gap-4">
        <h1 className="font-bold text-[#4A4A4A] text-[14px]">JOIN OUR TEAM</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="bg-[#ED7125] text-white font-medium text-[10px] rounded-[4px] px-4 py-1 shadow hover:bg-[#d15d15] transition-all"
            >
              Send Application
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[94vw] px-0 rounded-xl">
            <DialogTitle></DialogTitle>
            <div className="p-2">
              <CareerOpeningForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
