import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { FlowerApiService } from "./api/api.service";
import { BingApiService } from "./bing/bing.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, NgbModule, FormsModule],
  providers: [FlowerApiService, BingApiService, NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule {}
