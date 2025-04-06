import { AfterViewInit, Component, ElementRef, ViewChild, Input, OnChanges  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  
  title = "greenthumbs";
}
