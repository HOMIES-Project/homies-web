import { GroupsService } from './../../core/services/groups.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrls: ['./group-creation.component.css']
})
export class GroupCreationComponent implements OnInit {

  constructor(private groupsService: GroupsService,
    private modalService: NgbModal) { }

  ngOnInit(): void {


  }





}
