import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { FlowerApiService } from "./api/api.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, NgbModule],
  providers: [FlowerApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
