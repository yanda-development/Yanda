import Onboarding1 from '../assets/onboarding-1.svg';
import Onboarding2 from '../assets/onboarding-2.svg';
import Onboarding3 from '../assets/onboarding-3.svg';

export interface OnboardingSlide {
    id: number;
    title: string;
    description: string;
    image: any;
}

export const onboardingSlides: OnboardingSlide[] = [
    {
        id: 1,
        title: "Buy & Sell Seamlessly",
        description: "List your items in seconds and discover great deals. One app for all your peer-to-peer marketplace needs. Post items for free, reach thousands of local buyers, and grow your sales.",
        image: Onboarding1,
    },
    {
        id: 2,
        title: "Escrow Protection",
        description: "Payments are held securely until you confirm satisfaction. Your money is safe until you're happy. When you purchase an item, the funds go into our secure escrow account - not directly to the seller.",
        image: Onboarding2,
    },
    {
        id: 3,
        title: "Smart Delivery Options",
        description: "Choose local pickup, shipping, or courier. Calculate accurate prices based on your preferred delivery method. Meet locally to inspect items before buying, or ship anywhere in the country with integrated tracking.",
        image: Onboarding3,
    },
];