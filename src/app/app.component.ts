import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  monthDays: number[] = [];
  monthName: string;
  currentMonth: number;
  firstOfMonth: number;
  currentYear: number;
  isToday: number;

constructor(private calendarService: CalendarService){}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.firstOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    this.monthDays = this.calcuateDays();
    this.isToday = new Date().getDate();
  }

  calcuateDays(): number[] {
    const arr = [];
  
    for (let i = 2 - this.firstOfMonth  ; i < 44 - this.firstOfMonth ; i++) {
        arr.push(new Date(this.currentYear, this.currentMonth, i).getDate());
    }
    this.monthName = this.calendarService.getMonthName(this.currentMonth);
  
    return arr;
    }
  
  
  onPreviousMonth(): number[] {
    const arr = [];
    
    this.firstOfMonth = new Date(this.currentYear, this.currentMonth - 1, 1).getDay(); // 2
    this.currentMonth  = this.currentMonth - 1
    
    if (this.firstOfMonth !== 0){
    for (let i = 2 - this.firstOfMonth; i < 44 - this.firstOfMonth; i++) {
        arr.push(new Date(this.currentYear, this.currentMonth , i).getDate());
    }
    } else if (this.firstOfMonth === 0) {
      for (let i = this.firstOfMonth - 5  ; i < 42 - 5 ; i++ ){
        arr.push(new Date(this.currentYear, this.currentMonth , i).getDate()); 
      }
    }
    if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
    }
  
    this.monthName = this.calendarService.getMonthName(this.currentMonth);
  
    return this.monthDays = arr;
  }
  
  
  onNextMonth(): number[] {
    const arr = [];
    
    this.firstOfMonth = new Date(this.currentYear, this.currentMonth + 1, 1).getDay(); // 2
    this.currentMonth  = this.currentMonth + 1
    
    if (this.firstOfMonth !== 0){
      for (let i = 2 - this.firstOfMonth  ; i < 44 - this.firstOfMonth ; i++) {
        arr.push(new Date(this.currentYear, this.currentMonth , i).getDate()); 
    }  
  
    } else if ( this.firstOfMonth === 0) {
      for (let i = this.firstOfMonth - 5  ; i < 42 - 5 ; i++ ){
        arr.push(new Date(this.currentYear, this.currentMonth , i).getDate()); 
      }
    }
    
    if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
    }
    
    this.monthName = this.calendarService.getMonthName(this.currentMonth);
    
    return this.monthDays = arr;
  }
  

}
