export interface Dashboard {
  id: number;
  name: string;
  icon: DashboardIcons;
  background: DashboardBackgrounds;
  columns: DashboardColumn[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardColumn {
  id: number;
  cards: DashboardColumnCard[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardColumnCard {
  id: number;
  name: string;
  description: string;
  priority: DashboardColumnCardPriority;
  deadline: Date;
  createdAt: string;
  updatedAt: string;
}

export enum DashboardColumnCardPriority {
  Without = 'without',
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum DashboardIcons {
  Project = 'project',
  Star = 'star',
  Loading = 'loading',
  Puzzle = 'puzzle',
  Container = 'container',
  Lightning = 'lightning',
  Colors = 'colors',
  Hexagon = 'hexagon',
}

export enum DashboardBackgrounds {
  NoBg = 'no-bg',
  AquaSakura = 'aqua-sakura',
  Aqua = 'aqua',
  Balloon = 'balloon',
  Green = 'green',
  Moon = 'moon',
  Mountain = 'mountain',
  MountainBalloons = 'mountain-balloons',
  Night = 'night',
  PurpleNight = 'purple-night',
  Sakura = 'sakura',
  Sand = 'sand',
  Ship = 'ship',
  Sky = 'sky',
  Space = 'space',
  Traveling = 'traveling',
}
