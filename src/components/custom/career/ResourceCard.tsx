import EllipseDecoration from "./EllipseDecoration";

type ResourceData = {
  title: string;
  image: string;
  description: string;
  designation: string;
};

function ResourceCard({ data }: { data: ResourceData }) {
  return (
    <div className="relative bg-[#F9F4EE] rounded-[18px] px-4 py-6 md:py-8 md:px-7 xl:px-8 w-full max-w-[500px] min-h-[250px] flex flex-col justify-between shadow-[0_2px_8px_0_rgba(51,51,51,0.04)] overflow-visible">
      {/* 4 Ellipse Overlays */}
      <EllipseDecoration />
      {/* Description */}
      <div className="mb-8">
        <p className="text-[#343434] font-light text-[15px] md:text-[17px] xl:text-[18px] leading-relaxed">
          {data.description}
        </p>
        <button className="group flex items-center gap-1 mt-4 text-[#ED7125] font-bold text-[13px] md:text-[14px] uppercase tracking-tight transition-colors hover:text-[#d76420]">
          READ MORE
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="#ED7125" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>
        </button>
      </div>
      {/* Avatar & Name/Designation */}
      <div className="flex items-center mt-auto gap-4">
        <div className="">
          {/* Ellipse overlays around image */}
          <div className="absolute left-[-23px] bottom-[-23px]">

          <img src={data.image} alt={data.title}  className="rounded-full relative z-20 w-[70px] h-[70px] object-cover" />
          </div>
        </div>
        <div className="flex flex-col ml-10">
          <span className="text-[#343434] font-semibold text-[17px] md:text-[19px] xl:text-[20px]">{data.title}</span>
          <span className="text-[#343434] font-light uppercase text-[14px] md:text-[15px] xl:text-[16px]">{data.designation}</span>
        </div>
      </div>
    </div>
  )
}

export default ResourceCard;