import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core'

@Component ({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {
    @Input() rating: number;
    starWidth: number;
    @Output() ratingClicked: EventEmitter <string> = new EventEmitter <string> ();

    ngOnChanges () : void {
        this.starWidth = this.rating * 86 / 5;
    }

    onClick (event) {
        this.ratingClicked.emit (`Clicked ${this.rating}!`);
        //console.log (event.target.parentElement)
        // $(event.target).parent().fadeOut (function () {
        //     console.log ($(event.target).parent().parent().siblings(".numberRating").css("visibility"))
        //     if ($(event.target).parent().parent().siblings(".numberRating").css("visibility") == "hidden") {
        //         console.log("Changing to numbers")
        //         $(event.target).parent().parent().css("visibility", "hidden");
        //         $(event.target).parent().parent().siblings(".numberRating").css("visibility", "visibile");
        //     }
        //     else {
        //         console.log("Changing to stars")
        //         $(event.target).parent().parent().css("visibility", "visible");
        //         $(event.target).parent().parent().siblings(".numberRating").css("visibility", "hidden");
        //     }
            
        //     $(event.target).parent().fadeIn();
        // });
    }
}