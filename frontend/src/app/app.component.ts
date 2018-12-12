import { Component } from "@angular/core";
import { FlowerApiService } from "./api/api.service";
import { flower, sighting } from "./api/api.model";
import { BingApiService } from "./bing/bing.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "A5CIS4301";
  flowerList: string[] = [];
  flowerImages: { [key: string]: string } = {};
  flowerDetails: flower;
  flowerSightings: sighting;

  updateSuccess: boolean;
  insertSuccess: boolean;

  constructor(private api: FlowerApiService, private bing: BingApiService) {
    this.getFlowerList();
  }

  private getFlowerPicture(flower: string) {
    if (!this.flowerImages[flower]) {
      this.bing.getImageFromQuery(flower).then(
        res => {
          let image = this.bing.getURLFromResult(res);
          this.flowerImages[name] = image;
        },
        err => {
          return "http://www.browsertechnicalsupportnumbers.com/wp-content/uploads/2017/08/Troubleshoot-Opera-Browser-Incompatibility-Error.png";
        }
      );
    }
  }

  private getFlowerList() {
    this.api.getFlowerList().subscribe(
      res => {
        this.flowerList = res;
        this.flowerList.forEach(name => {
          this.getFlowerPicture(name);
        });
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
