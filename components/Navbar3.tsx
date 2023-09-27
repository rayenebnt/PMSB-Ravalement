

const Navbar3 = () => {
    return (
        <nav>
          <div className='left'>
           <a href="/"><img className='leftimage' src="Logo.png"></img></a>
           <a href="/"><img className='icone' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAApElEQVR4nO3SvwpBURzA8cMgqzLfLEYZeAWbp7B5C6/gHWweQpHRamGSmGWT+lgU4fpz7y0Dnzrb73x/dToh/AxEmJ1PlHW8hpWLDRpZxVvYubdHO228g4N4R3SThHPoPQnf6iP/bryAgc8NUXwVL2EkuSnKcfEK5tJboHobr2MtO1s0rxcsZW8R91SphDd+0XcWhIRz/wU/+kSTB/fGSef+wisnZGnoi1oyZj0AAAAASUVORK5CYII="></img></a>
          </div>
          <div className='right2'>
            <a href="/ravalement">Ravalement</a>
            <a className="qui" href="/isolation"><span>Isolation</span></a>
            <a href="/etancheite">Etanchéité</a>
          </div>
        </nav>
      );
    };
  
  export default Navbar3;