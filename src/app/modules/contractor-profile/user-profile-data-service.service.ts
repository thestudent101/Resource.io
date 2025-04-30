import { Injectable } from '@angular/core';
import { Races, Titles, Provinces, References, WorkHistory, Skills, Certifications, Qualifications } from './user-profile-models';

@Injectable({
  providedIn: 'root'
})
export class UserProfileDataServiceService {

    races: Races[] = [
        { description: 'Black' },
        { description: 'Indian' },
        { description: 'Coloured' },
        { description: 'White' }
    ];
    titles: Titles[] = [
        { description: 'Dr' },
        { description: 'Prof' },
        { description: 'Mr' },
        { description: 'Mrs' },
        { description: 'Ms' },
        { description: 'Miss' },
    ];
    provinces: Provinces[] = [
        { description: 'Western Cape' },
        { description: 'Eastern Cape' },
        { description: 'Northern Cape' },
        { description: 'North West' },
        { description: 'Free State' },
        { description: 'KwaZulu-Natal' },
        { description: 'Gauteng' },
        { description: 'Limpopo' },
        { description: 'Mpumalanga' },
    ];

    cities = {
        EasternCape: [
            { description: 'Alice' },
            { description: 'Butterworth' },
            { description: 'East London' },
            { description: 'Graaff-Reinet' },
            { description: 'Grahamstown' },
            { description: 'King William’s Town' },
            { description: 'Mthatha' },
            { description: 'Port Elizabeth' },
            { description: 'Queenstown' },
            { description: 'Uitenhage' },
            { description: 'Zwelitsha' }
        ],
        FreeState: [
            { description: 'Bethlehem' },
            { description: 'Bloemfontein' },
            { description: 'Jagersfontein' },
            { description: 'Kroonstad' },
            { description: 'Odendaalsrus' },
            { description: 'Parys' },
            { description: 'Phuthaditjhaba' },
            { description: 'Sasolburg' },
            { description: 'Virginia' },
            { description: 'Welkom' }
        ],
        Gauteng: [
            { description: 'Benoni' },
            { description: 'Boksburg' },
            { description: 'Brakpan' },
            { description: 'Carletonville' },
            { description: 'Germiston' },
            { description: 'Johannesburg' },
            { description: 'Krugersdorp' },
            { description: 'Pretoria' },
            { description: 'Randburg' },
            { description: 'Randfontein' },
            { description: 'Roodepoort' },
            { description: 'Soweto' },
            { description: 'Springs' },
            { description: 'Vanderbijlpark' },
            { description: 'Vereeniging' }
        ],
        KwaZuluNatal: [
            { description: 'Durban' },
            { description: 'Empangeni' },
            { description: 'Ladysmith' },
            { description: 'Newcastle' },
            { description: 'Pietermaritzburg' },
            { description: 'Pinetown' },
            { description: 'Ulundi' },
            { description: 'Umlazi' }
        ],
        Limpopo: [
            { description: 'Giyani' },
            { description: 'Lebowakgomo' },
            { description: 'Musina' },
            { description: 'Phalaborwa' },
            { description: 'Polokwane' },
            { description: 'Seshego' },
            { description: 'Sibasa' },
            { description: 'Thabazimbi' }
        ],
        Mpumalanga: [
            { description: 'Emalahleni' },
            { description: 'Nelspruit' },
            { description: 'Secunda' }
        ],
        NorthWest: [
            { description: 'Klerksdorp' },
            { description: 'Mahikeng' },
            { description: 'Mmabatho' },
            { description: 'Potchefstroom' },
            { description: 'Rustenburg' }
        ],
        NorthernCape: [
            { description: 'Kimberley' },
            { description: 'Kuruman' },
            { description: 'Port Nolloth' }
        ],
        WesternCape: [
            { description: 'Bellville' },
            { description: 'Cape Town' },
            { description: 'Constantia' },
            { description: 'George' },
            { description: 'Hopefield' },
            { description: 'Oudtshoorn' },
            { description: 'Paarl' },
            { description: 'Simon’s Town' },
            { description: 'Stellenbosch' },
            { description: 'Swellendam' },
            { description: 'Worcester' }
        ]
    }

    noticePeriods = [
        { description: 'Immidietely' },
        { description: '1 Week' },
        { description: '2 Weeks' },
        { description: '1 Month' }
    ]

    genders = [
        { description: 'Male' },
        { description: 'Female' }
    ]

    levels = [
        { description: 'Junior' },
        { description: 'Intermediate' },
        { description: 'Senior' }
    ]

  constructor() { }
}
