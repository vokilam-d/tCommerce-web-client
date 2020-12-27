import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { AnnouncementDto } from '../../shared/dtos/announcement.dto';
import { API_HOST } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  getAnnouncement() {
    return this.http.get<ResponseDto<AnnouncementDto>>(`${API_HOST}/api/v1/announcement`);
  }
}
