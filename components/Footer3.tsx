import React from 'react';
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
</head>

const Footer3: React.FC = () => {
  return (
    <footer className="footer3" id='contact'>
      <div className="container">
      <div className='adresse'>
            <h2><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEFUlEQVR4nO2aXYhVVRTHj6KiNupojjTUQ+DHKJhUJL4EMxnSB4UopaJPvgpKL6Jlwaj1YEhvFaVBPUihZJIEoT5IGA7jJ5mICqKI4BeOMzU6Wc4v1tz/wc293rPPnbN33Yn+cGC457//a62z915rf0yS/I9KAOOB5cA2oBO4DtzTc12/fQ4sA8Yl9QagBfgCuEN+9ALbgen1EMBYYCvwp5zr11ffALQqwEf0tOi3d4Ej4qLe+hAY/W8FMR04JWfuAzuAqTW0nwZ87QR0GGiO63WlE89ozBvOAs8W0HoOOCety8CcsN5m90QaxD5gYgDNScB+J5jmf2JOnHKCGBFQeyRwwBlm8eaMJnY6nCZG0J8EnJeNjaH1UyMtyk73i8yJHHbmKgH8DjwWw4DVCcOO4OKVtr6RrU9iVOxefSlvigWmAJuBE/qy9hwHNgFNORNKv9o1hAzElh2GzhzcN4CejIreDSzOoXNU/KUhA7G1k2FDjiDSAvedKnla2duAPU4BXeTRek/cz0IGYssOQ6tnOKU9sTaDt06c28DkDN4L4nWEiCEVvSHRGRmczWlP5ND73pdigRniXCvie7noHxKtuvQGTvp67SFf+3gGZ5w4fUV8Lxe9K9Gq1Rb4TRxvlnGc7PGsIgx3ivheLnp1QDKjQDnzoyFnOjd0Z3AeF+dKEd/LRc9IdHYGx2qGoS2H3nxxj2Vwnhbn1yK+l4vuleiSDI4VO8OeGvTaMzgrxNldxPdy0Q8k+n4Gp0nFzrAug/e2OF3Aoxm8Lb5ga4b1hEQPeHiLVexQirXs1KBnvtMTxlno0Tok7sKQgUyR8T7LJh7uIhW7aujKEUSjVtr2TAgWiMRt0Wd4NQd3shU7m8xKyz1aO7VnDacUwJuydSgJDadyfxlcvNLWt765VkR8Zpr7fcOroJ0JKsC2+HwylhEbKoYVUQwkAzZWy8bBJKKRVTJyOJL+COCCbCyPYSM11OBkpLkR9JdJ+4qdqoTWLzf2kYztijh03wmt/TBjzc5kfCqg7gIFYT3eGErXZ/Tj0L1ik5uY51lVjD7hnKo8H0DPVgOGmzEO/nzGrUqjij+8gM4o5xB7VVgv8zkwBrgoB1YW0FkrjdMhz5IHe95lO8jxg2jf5KTzl+J4mc+RYcDPcmTrINp/pbZ743hY+6WPXZ/9Bcyrod3LCqK3lpuuqHC2uWfy3GvoFOWS2qxJ6gWUMs8vvu2ww/803W8UyXhRoFOPe9pJtnmGVL92m7OSegSlXSFKy41VtszXxHkrqVdQWob/JEd3W1Zz3g0HftS7H9x3dQlKy5cb5dcQzlb5apQrtRgAXtc8sPnyCvCa/rYU/WIylMCDtdgtHQEZ1idDDZSq/k4FUDFnhhQoFb4O/QNAuEvN5D+MvwHicecgMX2K0wAAAABJRU5ErkJggg=='></img>Adresse</h2>
            <p>94380 Bonneuil-Sur-Marne</p>
        </div>
        <div className='telephone'>
            <h2><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADh0lEQVR4nO2ZS0hVURSGt70Mo5TK0rQig0ZChYM0aVBEkygIqSARUxKFXsNoLI4qjMJKqEnNKjIregyiaGAPQRMiegx6UBFUWlloD/ti4Tq4Mc+559TxtoX7D+/99z7/Pnuvtf69jjEppPD/AKwH2oF+oAsoMWMJwCSgiT/RA+SZsQAgE7iuwvuAHcBMoFV/u2xcB5AD3FfBr4GiYf+91/+qjasApgEdKvQhMH8ETrn+/xGYZ1wDkA7cUpEPgBkB3BZnjxjQoOJeAPkJuHLEPii/0rgEoFuFrQzJr1C+jMs1roDBOiHIijDmko5pMa4AeKqiCiOMydegF2w2LoChAC6POK5Gxz02LoDBoic4GXGcFErBTyBt9BSGBLAQ+AV8BqZGGLdVF9JuXAFDtqQuJH8y8Ny5NAxs8s47MCEEf6/yO4FxxhUA49WaCGoTcGcBn5S72rgGoEzFvQEyAnjNyms1LgJIA+6qyH0BsdGrnG3GVQBLge/AALDCh7PLumgtMK4CqLcCP8Nn5y4q517QMXThqtulQpt8OFlWcjgvycK4CGCJXnUFVQGF9J1ymp2o7iNBFqAiZUHLfDglVvA3GlcBHLJS8ogdFGCVtXsHjIsAJgI3VGSbX2AD6zTbCRqMiwCygWcq8ookAx/eRmsxjU7GDLAIeKsiT/tlKd0Z75gdczKbAYu1CAqO+71xjZleKzVn+Hi7KjWdA8ATMa5JWYgKWA58SRTYQLGVmtvtPpkYTatODcdZYHayFrMG+OYtJmBnCqyi2a1XY88RoHFXqTfNGstRS0dzS7IWs8FazImAmBEHcGHYWxfBe8SADuPO1WTiQXoJOcnaGe+YnQnIZuLNdmrcHJX7TIJ5q61YlGZgxagtwnpoqfXQqwnuMekR5s2zemfokZwTm/AAX+al5ttxdh8ZjCGvE9rjZ5XirjNeM+JVnA8Ecq0k0RnXvIkcwE19YL+fa/7LuafrvF/jmjOMNztsne0jcVy8gN06X1s8SsM/uMpqjkvVLv2HuYqtVL82XqXhk4BXwcWG7AemRJyjwEokB0dPbbhrs/QAflj3mtqQTcBs4JGOuybHNjmqg0UVAXes2JHGRp1fr5nBKu/Zm44oPelRh1b4Musto43zU/qhtVA/j4t7fuml26SZyKiQYyUfh7RxLl8B/CCpPNOMBWgwbwfOaXbrU/dbH8XSpJCCiRe/AQGfCXGn/vU8AAAAAElFTkSuQmCC"></img>Téléphone</h2>
            <p>06 13 40 19 01</p>
        </div>
        <div className='email'>
            <h2><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACJklEQVR4nO3YS6hNcRTH8b/3q9xEiJBuXQYMGEhJkVJSklJKMVB3amh0S3dkamggJWWiZGLAgJQUSSYMiAGRR97v10f7Wrd2p3PuOffcfZxH+1t7ss9vrfX/9T/rv/faKZWUlJSUtAM9QtJrRlKXomeNoD91GeivZuQ9dqcuATvwppqRjD84hsmpQ8EkHMHvqs2OodyPF9CXOgz0xdrEWoeqNnvFdj3AmtQhYBXuVbZBzVMLy3Erbn/E3rY6SCNr2oV3saa7+YNpzOMXM3Eq97c7gWltMDAlejbr3YyzmFOhqW0kJxrEj5BcxaL/aGI+LkXtn1mD19DVNxLCzXgesifY0FIHaaTmOjyKmq+wbQxtY0ZCvBQ3QvoNh1riII3U2o/PUes2VtTRN24kAmbgeEXfTC/QwNToh1FOY1YDceMzkgs8gC8Rdh1LCjCxEFdyOz44jtjmjETwejyO0JfY2pSDf7k24VnkeoqN44xv3kgkWIDL9U6VOjmyU/F75LiGxU3kmJiRGuf8GcxuIC57Tp0s4jmlCCO5ZPvwKVLdwcoxtMtwM7RfcXCCtYsdrLAa9yPda2yvotmCF6F5iLUF1C1+QsRcnI+Uv3A0Gwni1ftw9FLGRcwrqGZrRt1Y+HCub87FJe4NFznvaJWRXIGdeDuaHx+wpwV1Wv/xAQMxEmTXQItq9OhXlNSlKI10GMod6TCUO9Jh6Nkd6XaSHiGVlJSUlKQ28BeJl84fDKCHpgAAAABJRU5ErkJggg=='></img>E-mail</h2>
            <p>pmsb.pmsb@yahoo.fr</p>
        </div>
     </div>

     <div className='bloc2'>
          <img className="image1" src='Logo.png'></img>
          <div className='navigation'>
            <h2>Navigation</h2>
            <a href='/'>Acceuil</a>
            <a href='/ravalement'>Ravalement</a>
            <a href='/isolation'>Isolation</a>
            <a href='/etancheite'>Etanchéité</a>
          </div>
          <div className='qualification'>
            <h2>Qualification</h2>
            <img src='label.png'></img>
          </div>
          <div className='suiveznous'>
          <h2>Suivez-nous</h2>
          <a href='https://www.linkedin.com/in/sarl-pmsb-740726280/' target='_blank'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAByElEQVR4nO2ZP0/CQBjG22scXI2Tiauy+glc3MC4+iX8DA6G9IiDJsYBBhdNHJwcNRGIHY3xjoBCgkTEAUP8A63yt7ymBVQEIq2mvSb3JM/UN5fnd+97N1wFgYuLi4tpSTJdQTKJI5lqCFNwxDLVRExjkkyW/xRexAQ7FhoPt4hJ0P7OuxwedS2FSMAygDk2DIRHRhdkGrUOgInqdnDUs0wqNgAYCI6//G8AvkgazgsaaA0dlIIG8+G0twCUggbfFb/XvAWgNfQ+ALWuewtA8XoHfJG0CWF0IpZXYS584y0A5JIFDoA7OzFM43yf3b2G7YsSpEpVqDbb8FprmaO4dvoAk5sJtgEW9jLw+NaEUbosvsPMTopdgOxLHX5TLK+CxCrAuPIf5dgE0Ntgzv/S4S2sHucheqcOrdtPPrMJsK4U+2omQgk4yVUG6jJPNTYBpreTA+ssHmQH6sq1FnsA7R/fe57aSo5d63oH7K6FOADmHTDFRwjzQ0z5LYT4NWpRo24Otyx4+mkR07JlAON9noHgYFjE9MwygPFzwe3gqGsJX/ktA3S6QIJuhxcx2bAV/rMTIRIw3uedPRNENcbG9s5zcXFxCU7pA5Jwntel+S2tAAAAAElFTkSuQmCC'></img>Linkedin</a>
        </div>
        </div>
      <p className='c'>© Copyright 2023 PMSB</p>
    </footer>
  );
};

export default Footer3;
