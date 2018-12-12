import { Component } from "@angular/core";
import { FlowerApiService } from "./api/api.service";
import { flower, sighting } from "./api/api.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "frontend";
  flowerList: string[] = [];
  flowerDetails: flower;
  flowerSightings: sighting;

  updateSuccess: boolean;
  insertSuccess: boolean;

  constructor(private api: FlowerApiService) {
    this.getFlowerList();
  }

  private getFlowerList() {
    this.api.getFlowerList().subscribe(
      res => {
        this.flowerList = res;
      },
      err => {
        this.flowerList = ["Error: " + err];
      }
    );
  }

  private getFlowerDetails(flower: string) {
    this.api.getFlowerDetails(flower).subscribe(
      res => {
        this.flowerDetails = res;
      },
      err => {
        this.flowerDetails = null;
      }
    );
  }

  private getFlowerSightings(flower: string) {
    this.api.getFlowerSightings(flower).subscribe(
      res => {
        this.flowerSightings = res;
      },
      err => {
        this.flowerSightings = null;
      }
    );
  }

  private updateFlowerDetails(flower: flower) {
    this.api.updateFlowerDetails(flower).subscribe(
      res => {
        this.updateSuccess = true;
      },
      err => {
        this.updateSuccess = false;
      }
    );
  }

  private postFlowerSightings(sighting: sighting) {
    this.api.postFlowerSightings(sighting).subscribe(
      res => {
        this.insertSuccess = true;
      },
      err => {
        this.insertSuccess = false;
      }
    );
  }
}
