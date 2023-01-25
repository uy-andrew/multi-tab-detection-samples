import { Component } from '@angular/core';
import { MultiTabDetection } from 'multi-tab-detection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'multi-tab-detection sample';
  multiTabDetection: MultiTabDetection;
  listOfEvents: string[];
  timeOutSet: boolean;

  constructor() {
    this.initializeData();
    this.initializeDetection();
  }

  initializeData() {
    this.listOfEvents = [];
    this.timeOutSet = false;
  }

  initializeDetection() {
    this.multiTabDetection = new MultiTabDetection();

    const thisInstance = this;
    this.multiTabDetection.ExistingTabDetectedEvent.subscribe({
      next: () => {
        const dateTimeNow = new Date();
        thisInstance.listOfEvents.push(`${dateTimeNow.toLocaleString()} - Existing Tab Detected`);

        if (thisInstance.timeOutSet === false) {
          thisInstance.timeOutSet = true;
          setTimeout(() => {
            thisInstance.timeOutSet = false;
            console.log(`${thisInstance.multiTabDetection.NumberOfTabsOpened} tabs opened`);
          }, 1000);
        }

      }
    });

    this.multiTabDetection.NewTabDetectedEvent.subscribe({
      next: (totalNumberOfTabsOpened) => {
        const dateTimeNow = new Date();
        thisInstance.listOfEvents.push(`${dateTimeNow.toLocaleString()} - New Tab Detected. ` +
          `totalNumberOfTabsOpened = ${totalNumberOfTabsOpened}`);
      }
    });

    this.multiTabDetection.ClosedTabDetectedEvent.subscribe({
      next: (totalNumberOfTabsOpened) => {
        const dateTimeNow = new Date();
        thisInstance.listOfEvents.push(`${dateTimeNow.toLocaleString()} - Closed Tab Detected. ` +
          `totalNumberOfTabsOpened = ${totalNumberOfTabsOpened}`);
      }
    });
  }
}
