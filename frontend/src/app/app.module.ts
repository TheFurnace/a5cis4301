import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { FlowerApiService } from "./api/api.service";
import { BingApiService } from "./bing/bing.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, NgbModule],
  providers: [FlowerApiService, BingApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
