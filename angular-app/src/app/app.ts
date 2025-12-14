import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultiTabDetection } from 'multi-tab-detection';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('multi-tab-detection sample');

  multiTabDetection: MultiTabDetection | undefined;
  listOfEvents = signal<string[]>([]);
  timeOutSet: boolean = false;

  constructor() {
    this.initializeDetection();
  }

  initializeDetection() {
    this.multiTabDetection = new MultiTabDetection();

    const thisInstance = this;
    this.multiTabDetection.ExistingTabDetectedEvent.subscribe({
      next: () => {
        const dateTimeNow = new Date();
        thisInstance.listOfEvents.update(values => { 
          return [...values, `${dateTimeNow.toLocaleString()} - Existing Tab Detected`]
        });

        if (thisInstance.timeOutSet === false) {
          thisInstance.timeOutSet = true;
          setTimeout(() => {
            thisInstance.timeOutSet = false;
            console.log(`${thisInstance.multiTabDetection!.NumberOfTabsOpened} tabs opened`);
          }, 1000);
        }

      }
    });

    this.multiTabDetection.NewTabDetectedEvent.subscribe({
      next: (totalNumberOfTabsOpened) => {
        const dateTimeNow = new Date();
        thisInstance.listOfEvents.update(values => { 
          return [...values, `${dateTimeNow.toLocaleString()} - New Tab Detected. totalNumberOfTabsOpened = ${totalNumberOfTabsOpened}`]
        });
      }
    });

    this.multiTabDetection.ClosedTabDetectedEvent.subscribe({
      next: (totalNumberOfTabsOpened) => {
        const dateTimeNow = new Date();
        thisInstance.listOfEvents.update(values => { 
          return [...values, `${dateTimeNow.toLocaleString()} - Closed Tab Detected. totalNumberOfTabsOpened = ${totalNumberOfTabsOpened}`]
        });
      }
    });
  }
}
