import { AfterViewInit, Component } from '@angular/core';

declare var Swiper: any;
 
interface Slide {
  class:string;
  title: string;
  description: string;
  linkText: string;
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})


export class DemoComponent implements AfterViewInit{
  
  currentStep: number = 0; // Track the current step
  steps: string[] = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Method to check if the step is completed
  isStepFilled(index: number): boolean {
    return index < this.currentStep || index === this.currentStep;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // slides: Slide[] = [
  //   {
  //     class:"swiper-slide swiper-slide--one",
  //     title: 'Java',
  //     description: 'Jellyfish and sea jellies are the informal common names given to the medusa-phase of certain gelatinous members of the subphylum Medusozoa, a major part of the phylum Cnidaria.',
  //     linkText: 'explore'
  //   },
  //   {
  //     class:"swiper-slide swiper-slide--two",
  //     title: '.Net',
  //     description: 'Seahorses are mainly found in shallow tropical and temperate salt water throughout the world. They live in sheltered areas such as seagrass beds, estuaries, coral reefs, and mangroves.',
  //     linkText: 'explore'
  //   },
  //   {
  //     class:"swiper-slide swiper-slide--three",
  //     title: 'Python',
  //     description: 'Octopuses inhabit various regions of the ocean, including coral reefs, pelagic waters, and the seabed; some live in the intertidal zone and others at abyssal depths.',
  //     linkText: 'explore'
  //   },
  //   {
  //     class:"swiper-slide swiper-slide--four",
  //     title: 'Tester',
  //     description: 'Sharks are a group of elasmobranch fish characterized by a cartilaginous skeleton, five to seven gill slits on the sides of the head, and pectoral fins that are not fused to the head.',
  //     linkText: 'explore'
  //   },
  //   {
  //     class:"swiper-slide swiper-slide--five",
  //     title: 'Angular',
  //     description: 'Dolphins are widespread. Most species prefer the warm waters of the tropic zones, but some, such as the right whale dolphin, prefer colder climates.',
  //     linkText: 'explore'
  //   }
  // ];
  ngAfterViewInit() {
   
    const swiper = new Swiper('.swiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,  
      autoplay: {
        delay: 2000,  
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3,
        slideShadows: true,
      },
      keyboard: {
        enabled: true,
      },
      mousewheel: {
        thresholdDelta: 70,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 2,
        },
        1560: {
          slidesPerView: 3,
        },
      },
    });
  }
  // onSlideClick(event: any) {
  //   const swiperElement = document.querySelector('.swiper') as HTMLElement | null;
 
  //   if (swiperElement) {
  //     const swiper = (swiperElement as any).swiper; 
 
  //     const clickedSlide = event.currentTarget;
  //     swiper.slideTo(swiper.slides.indexOf(clickedSlide));
  //   }
  // }
}
