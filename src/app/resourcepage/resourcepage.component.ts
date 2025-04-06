import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resourcepage',
  imports: [FormsModule, CommonModule],
  templateUrl: './resourcepage.component.html',
  styleUrl: './resourcepage.component.css'
})
export class ResourcepageComponent {

  searchQuery: string = '';

  resources = [
    {
      title: 'Backyard Gardening 101',
      description: 'Beginner-friendly guide to planning and starting your own backyard garden.',
      link: 'https://www.gardendesign.com/small/',
    },
    {
      title: 'Soil Preparation Tips',
      description: 'Learn how to prepare healthy, fertile soil for planting.',
      link: 'https://extension.umn.edu/planting-and-growing-guides',
    },
    {
      title: 'Watering Best Practices',
      description: 'Discover how often and how much to water your plants effectively.',
      link: 'https://www.rhs.org.uk/garden-jobs/watering',
    },
    {
      title: 'Composting for Beginners',
      description: 'Turn kitchen waste into nutrient-rich compost for your garden.',
      link: 'https://www.epa.gov/recycle/composting-home',
    },
    {
      title: 'Top Backyard Vegetables',
      description: 'List of easy-to-grow vegetables perfect for small backyard gardens.',
      link: 'https://www.thespruce.com/easy-vegetables-to-grow-8623492',
    },
    {
      title: 'Fertilizer Basics',
      description: 'Choosing and using the right fertilizers for your soil and plants.',
      link: 'https://agrilifeextension.tamu.edu/library/gardening/fertilizing/',
    },
    {
      title: 'Pest Control 101',
      description: 'Tips to keep common garden pests away naturally and safely.',
      link: 'https://www.gardendesign.com/pests-diseases/',
    },
    {
      title: 'Raised Bed Gardening',
      description: 'Why raised beds are great for backyards and how to build one.',
      link: 'https://fromsoiltosoul.ca/complete-raised-bed-gardening-guide-for-beginners/',
    },
    {
      title: 'Vertical Gardening Ideas',
      description: 'Grow more in less space with vertical garden structures.',
      link: 'https://www.gardeners.com/how-to/vertical-gardening/8741.html',
    },
    {
      title: 'YouTube: Backyard Gardening Step-by-Step',
      description: 'Visual guide to getting started with raised beds, soil prep, and more.',
      link: 'https://youtu.be/NlS_dTDsHHQ?si=xV4tym3znPbjk_MF',
    },
    {
      title: 'YouTube: Easy Compost at Home',
      description: 'Learn how to build a compost system and reduce kitchen waste.',
      link: 'https://youtu.be/egyNJ7xPyoQ?si=TT-7Tl5fZl6OOzUV',
    },
    {
      title: 'YouTube: Top mistakes to avoid for Beginners',
      description: 'Quick tips every first-time gardener should know.',
      link: 'https://youtu.be/pLQuIuokP6Q?si=QXCRKV4XO68wp06q',
    },
  ];

  filteredResources() {
    if (!this.searchQuery.trim()) return this.resources;

    const query = this.searchQuery.toLowerCase();
    return this.resources.filter(
      (res) =>
        res.title.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query)
    );
  }
}
