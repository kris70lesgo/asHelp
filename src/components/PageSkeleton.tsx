import FooterSkeleton from "./skeletons/FooterSkeleton";
import HeroSkeleton from "./skeletons/HeroSkeleton";
import NavbarSkeleton from "./skeletons/NavbarSkeleton";
import ScrollSectionSkeleton from "./skeletons/ScrollSectionSkeletion";
import StepsSkeleton from "./skeletons/StepsSkeleton";
import TestimonialsSkeleton from "./skeletons/TestimonialsSkeleton";

const PageSkeleton = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-900 overflow-y-auto skeleton-animation">
            <NavbarSkeleton />
            <HeroSkeleton />
            <ScrollSectionSkeleton/>
            <StepsSkeleton />
            <TestimonialsSkeleton />
            <FooterSkeleton />
        </div>
    )
};

export default PageSkeleton;