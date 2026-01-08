import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit , OnDestroy  {

  currentSlide = 0;
  intervalId: any;

  slides = [
    {
      image: 'assets/cars/car4.jpg',
      title: 'Luxury Cars for',
      highlight: 'Every Journey',
      description: 'Premium vehicles with comfort, style, and performance.'
    },
    {
      image: 'assets/cars/car6.jpg',
      title: 'Affordable',
      highlight: 'Car Rentals',
      description: 'Best prices with no hidden charges. Rent with confidence.'
    },
    {
      image: 'assets/cars/car5.jpg',
      title: 'Drive Safe &',
      highlight: 'Comfortable',
      description: 'Well-maintained vehicles ready for long and short trips.'
    }
  ];


  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prev() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
