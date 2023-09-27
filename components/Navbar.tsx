

const Navbar = () => {
  return (
    <nav>
      <div className='left'>
       <a href="/"><img className='leftimage' src="Logo.png"></img></a>
        <a className="qui" href="#qui-sommes-nous"><span>Qui sommes nous ?</span></a>
        <a href="#contact" target='_self'>Contact</a>
      </div>
      <div className='right'>
        <a href="/ravalement">Ravalement</a>
        <a href="/isolation">Isolation</a>
        <a href="/etancheite">Etanchéité</a>
        <a href="#services">Services</a>
        <a href="#réalisations">Réalisations</a>
      </div>
    </nav>
  );
};

export default Navbar;