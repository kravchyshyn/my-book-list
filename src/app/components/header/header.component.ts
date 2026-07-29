import { Component, inject } from '@angular/core';
import { BookFormComponent } from '../book-form/book-form.component';
import { MatDialog } from '@angular/material/dialog';
import { XmlService } from '../../services/xml.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private dialog = inject(MatDialog);
  private xmlService = inject(XmlService);

  openAddDialog(): void {
    this.dialog.open(BookFormComponent, {
      width: '500px',
    });
  }

  importBooks(event: Event) {
    this.xmlService.importXml(event);
  }
}
