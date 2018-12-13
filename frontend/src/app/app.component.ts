import { Component } from "@angular/core";
import { FlowerApiService } from "./api/api.service";
import { flower, sighting } from "./api/api.model";
import { BingApiService } from "./bing/bing.service";
import { NgForm } from "@angular/forms";

import {NgbModal, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Assignment 5 CIS4301";
  flowerList: string[] = [];
  flowerImages: { [key: string]: string } = {};
  flowerDetails: flower = { comname: "", genus: "", species: "" };
  flowerEditDetails: flower = { comname: "", genus: "", species: "" };
  flowerSightings: sighting[];

  canEditFlower: boolean = false;
  currentFlower: string;


  constructor(private api: FlowerApiService, private bing: BingApiService, private modalService: NgbModal) {
    this.getFlowerList().then(() => (this.selectFlower(this.flowerList[0])));
  }

  private open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  private enableFlowerEdit() {
    this.canEditFlower = true;
  }

  private cancelFlowerEdit(form: NgForm) {
    form.resetForm();
    this.canEditFlower = false;
  }

  private onFormSubmitFlower(form: NgForm) {
    let newFlower: flower = {
      comname: form.controls['comname'].value,
      genus: form.controls['genus'].value,
      species: form.controls['species'].value
    }
    this.updateFlowerDetails(newFlower)
      .then(
        () => {
          this.flowerDetails = newFlower;
          this.cancelFlowerEdit(form);
        },
        err => (console.log(err.message))
      )
  }

  private onFormSubmitSighting(form: NgForm) {
    let sighted: NgbDate = form.controls['sighted'].value
    let newSighting: sighting = {
      name: form.controls['name'].value,
      person: form.controls['person'].value,
      location: form.controls['location'].value,
      sighted: (sighted.year + "-" + sighted.month + "-" + sighted.day)
    }
    this.postFlowerSightings(newSighting)
      .then(
        () => {
          this.flowerSightings = [newSighting].concat(this.flowerSightings);
        },
        err => (console.log(err.message))
      )
  }

  private onClickRefresh() {
    this.getFlowerList();
  }

  private onClickFlowerInfoButton(flower: string) {
    this.canEditFlower = false;
    this.selectFlower(flower);
  }

  private async selectFlower(flower: string) {
    await this.getFlowerDetails(flower);
    await this.getFlowerSightings(flower);
    this.currentFlower = flower;
  }

  private getFlowerPicture(flower: string) {
    if (!this.flowerImages[flower]) {
      return this.bing.getImageFromQuery(flower + "flower").then(res => {
        let image = this.bing.getURLFromResult(res);
        this.flowerImages[flower] = image;
      });
    }
  }

  private async getFlowerList() {
    return new Promise((resolve, reject) => {
      this.api.getFlowerList().subscribe(
        res => {
          this.flowerList = res;
          this.flowerList.forEach(name => {
            this.getFlowerPicture(name);
          });
          resolve();
        },
        err => {
          this.flowerList = ["Error: " + err];
          reject();
        }
      );
    });
  }

  private async getFlowerDetails(flower: string) {
    return new Promise((resolve, reject) => {
      this.api.getFlowerDetails(flower).subscribe(
        res => {
          this.flowerDetails = res;
          resolve();
        },
        err => {
          this.flowerDetails = null;
          reject();
        }
      );
    });
  }

  private async getFlowerSightings(flower: string) {
    return new Promise((resolve, reject) => {
      return this.api.getFlowerSightings(flower).subscribe(
        res => {
          this.flowerSightings = res;
          resolve();
        },
        err => {
          this.flowerSightings = null;
          reject();
        }
      );
    });
  }

  private async updateFlowerDetails(flower: flower) {
    return this.api.updateFlowerDetails(flower).toPromise()
  }

  private async postFlowerSightings(sighting: sighting) {
    return this.api.postFlowerSightings(sighting).toPromise();
  }
}
