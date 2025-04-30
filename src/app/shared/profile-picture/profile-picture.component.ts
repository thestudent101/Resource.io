import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SessionService } from '../session.service';
import { ImageResponse } from '../user-profile-models';

@Component({
  selector: 'user-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent {
  private canvas!: HTMLCanvasElement;
  private image!: HTMLImageElement;

  avatarSrc: string = "";   
  @Input() emailAddress: string = "";
  @Input() defaultText: string = "";

  @ViewChild("genericImage", { static: false }) canvasRef!: ElementRef;
  @ViewChild("avatar", { static: false }) imageRef!: ElementRef;

  constructor(private sessionClass: SessionService) { }

  ngOnInit() {
  }    

  ngAfterViewInit(){    
      this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
      this.image = this.imageRef.nativeElement as HTMLImageElement;
      setTimeout(()=>{
          this.renderDefaultImage();
          this.loadImage();
      },10)        
  }

  reloadImage(){
      this.loadImage();
  }

  get isPortrait(): boolean {
      if (!this.image) return false;
      return this.image.naturalHeight > this.image.naturalWidth;
  }

  private loadImage(){
      if (this.emailAddress.length == 0) return;
      this.sessionClass.getProfilePicture(this.emailAddress).then(response => {
          this.displayImage(response);
      }).catch(error => {
          console.log('no profile picture found', error.status);
      });
  }
  
  private displayImage(response: ImageResponse){
      let dataString = 'data:' + response.type + ';base64,';
      let imageString = response.image;
      if (imageString.indexOf(dataString) == -1) imageString = dataString + imageString;
      this.avatarSrc = imageString;
  }

  private renderDefaultImage(){
      if (this.avatarSrc.length > 0) return;
      if (!this.canvas) return;
      const ctx:any = this.canvas.getContext("2d");
      ctx.fillStyle = "black";
      ctx.textAlign = 'center';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.font="120pt Calibri";
      ctx.fillStyle = "white";
      ctx.fillText(this.defaultText, 150, 200);
      this.avatarSrc = this.canvas.toDataURL('image/png');
  }

}
