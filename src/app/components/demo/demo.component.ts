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
  
  ngAfterViewInit(): void {var galleryThumbs = new Swiper('.gallery-thumbs', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: '2',
    // coverflowEffect: {
    //   rotate: 50,
    //   stretch: 0,
    //   depth: 100,
    //   modifier: 1,
    //   slideShadows : true,
    // },
    
    coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 50,
          modifier: 6,
          slideShadows : false,
      },
      
    });
    
    
  var galleryTop = new Swiper('.swiper-container.testimonial', {
    speed: 400,
    spaceBetween: 50,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    direction: 'vertical',
    pagination: {
      clickable: true,
      el: '.swiper-pagination',
      type: 'bullets',
    },
    thumbs: {
      swiper: galleryThumbs
      }
    });
  }
}
