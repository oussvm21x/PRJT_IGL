import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-dashboard-infirmier',
  standalone: true,
  imports: [RouterModule,FullCalendarModule],
  templateUrl: './dashboard-infirmier.component.html',
  styleUrl: './dashboard-infirmier.component.css'
})
export class DashboardInfirmierComponent implements OnInit {
  calendarOptions: CalendarOptions = {};
  userName: string = 'Mark Leverese'; // Donnée statique

  // Définissez les événements comme un tableau de type EventInput
  events: EventInput[] = [
    { title: 'Consultation avec Dr. A', date: '2024-01-02' },
    { title: 'Conférence médicale', date: '2024-01-10' },
  ];

  ngOnInit(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: this.events, // Utilisez le tableau events
      headerToolbar: {
        left: 'prev',
        center: 'title',
        right: 'next',
      },
      height: '300px',
      contentHeight: 400,
      aspectRatio: 1.5,
      dayMaxEvents: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      eventColor: '#AACECE',
    };
  }

  // Méthode pour ajouter un événement
  // addEvent(): void {
  //   const newEventTitle = prompt('Entrez le titre de l\'événement :');
  //   const newEventDate = prompt('Entrez la date de l\'événement (AAAA-MM-JJ) :');

  //   if (newEventTitle && newEventDate) {
  //     const newEvent: EventInput = { title: newEventTitle, date: newEventDate };
  //     this.events.push(newEvent); // Ajoutez au tableau events
  //     this.calendarOptions.events = [...this.events]; // Mettez à jour la configuration
  //     alert('Événement ajouté avec succès !');
  //   } else {
  //     alert('Titre ou date invalide.');
  //   }
  // }
}