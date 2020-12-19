import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SidebarComponent } from './sidebar.component';
import { SidebarRoutingModule } from './sidebar-routing.module';

@NgModule({
    declarations: [SidebarComponent],
    imports: [CommonModule, IonicModule, SidebarRoutingModule],
    exports: [SidebarComponent],
})
export class SidebarModule {}
