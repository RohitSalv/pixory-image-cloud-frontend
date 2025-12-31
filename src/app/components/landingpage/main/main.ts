import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Hero } from "../hero/hero";
import { LiveDemo } from "../live-demo/live-demo";
import { Features } from "../features/features";
import { WhyPixory } from "../why-pixory/why-pixory";
import { UseCases } from "../use-cases/use-cases";
import { HowItWorks } from "../how-it-works/how-it-works";
import { Privacy } from "../privacy/privacy";
import { TechStack } from "../tech-stack/tech-stack";
import { FinalCTA } from "../final-cta/final-cta";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-main',
  imports: [Header, Hero, LiveDemo, Features, WhyPixory, UseCases, HowItWorks, Privacy, TechStack, FinalCTA, Footer],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
