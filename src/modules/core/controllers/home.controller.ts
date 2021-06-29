import { Request, Response } from 'express';

export function showHomePage(req: Request, res: Response) {
  res.render('home', {
    title: 'Animal Catalog',
    features,
    testimonials,
  });
}

interface Feature {
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    title: 'Lots of animals',
    description:
      'Improve your animals knowledge and become the animal expert in your group.',
  },
  {
    title: 'Completely Free',
    description:
      'You may think that access to all this information will cost a lot but no, all the information is completely free. All you need to do is create an account',
  },
  {
    title: 'Constant updates',
    description:
      'We update our animals database every day adding more animals or adding the mosto recent discoveries arround them.',
  },
];

interface Testimonial {
  author: string;
  content: string;
  authorPic: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    author: 'Gabriela Romero',
    authorPic: '/img/fake-people/gabriela-romero.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac nisi et justo sodales finibus id sed nibh. Phasellus vitae neque a augue cursus aliquet.',
    rating: 8,
  },
  {
    author: 'Danielle Khan',
    authorPic: '/img/fake-people/danielle-khan.jpg',
    content:
      'Enim id proident irure officia et pariatur in ullamco labore, non dignissim ante convallis sit amet. Ut sodales porta lorem in posuere.',
    rating: 9,
  },
  {
    author: 'Noah White',
    authorPic: '/img/fake-people/noah-white.jpg',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac nisi et justo sodales finibus id sed nibh. Phasellus vitae neque a augue cursus aliquet. Quisque blandit suscipit augue. Praesent congue sem quis massa finibus consectetur. Pellentesque porta augue nulla.',
    rating: 10,
  },
  {
    author: 'Sophie Hunt',
    authorPic: '/img/fake-people/sophie-hunt.jpg',
    content:
      'ingilla dui. Integer in mattis justo. Quisque imperdiet diam non sapien tincidunt, id mollis nulla iaculis. Curabitur sollicitudin libero justo, nec feugia',
    rating: 7,
  },
  {
    author: 'Francisco Lozada',
    authorPic: '/img/fake-people/francisco-lozada.jpg',
    content:
      'usce a velit in est egestas rutrum quis mattis turpis. Nam malesuada nulla a libero ullamcorper finibus. Sed at auctor nunc. Suspendisse libero lorem, maximus ut turpis nec, placerat bibendum elit. Nullam elementum, mi eu finibus hendrerit, elit magna malesuada ipsum.',
    rating: 7,
  },
  {
    author: 'Frank Richards',
    authorPic: '/img/fake-people/frank-richards.jpg',
    content:
      'Sed urna arcu, iaculis a pulvinar vel, condimentum vitae nibh. In vitae facilisis nunc. Nunc in lorem eget turpis pretium condimentum sit amet non magna. Cras placerat felis eu dapibus varius. Quisque vitae est blandit, euismod eros vel, dapibus neque. Praesent eu ante quis velit malesuada tristique eu in ex.',
    rating: 9,
  },
];
