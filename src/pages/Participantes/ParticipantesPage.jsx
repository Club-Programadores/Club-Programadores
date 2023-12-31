import { useState } from 'react'

import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import SearchBar from '../../components/SearchBar/searchBarFile.jsx'
import InteresesDropdown from '../../components/FiltersDropdown/InteresesDropdown/InteresesDropdownFile.jsx'
import SkillsDropdown from '../../components/FiltersDropdown/SkillsDropdown/SkillsDropdownFile.jsx'
import ParticipantesList from '../../components/ParticipantesList//ParticipantesList'
import SignUpModal from '../../components/SignUpModal/SignUpModal'

import participantesJson from '../../../assets/miembros.json'

import './/ParticipantesStyles.css'



function ParticipantesPage() {
  const [search, setSearch] = useState('')
  const [interesesFilter, setInteresesFilter] = useState([])
  const [skillsFilter, setSkillsFilter] = useState([])
  const [showDropdowns, setShowDropdowns] = useState(false)

  let participantes = JSON.parse(JSON.stringify(participantesJson)).miembros;

  const filteredParticipantes = () =>{
    if(search != ''){
      participantes = participantes.filter(participante => participante.nombre.toLowerCase().startsWith(search.toLowerCase()) )
    }
    if(interesesFilter.length != 0){
      participantes = participantes.filter(participante => interesesFilter.every(interes => participante.intereses.map(i => i.toLowerCase()).includes(interes.label.toLowerCase())))
    }
    if(skillsFilter.length != 0){
      participantes = participantes.filter(participante => skillsFilter.every(skill => participante.skills.map(i => i.nombre.toLowerCase()).includes(skill.label.toLowerCase())))
    }
    return participantes;
  }

  const [isModalOpen, setModalOpen] = useState(false);
    
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar onSignUpClick={toggleModal}/>
      {isModalOpen && <SignUpModal onClose={toggleModal}/>}
      <div className='listContainer'>
        <SearchBar setSearch={setSearch} showDropdownsState={showDropdowns} setShowDropdowns={setShowDropdowns}/>
        <div className={showDropdowns? "filter":"filter hidden"}>
          <InteresesDropdown setInteresesFilter={setInteresesFilter}/>
          <SkillsDropdown setSkillsFilter={setSkillsFilter}/>
        </div>
        <ParticipantesList participantes={filteredParticipantes()}/>
      </div>
      <Footer />
    </>
  )
}

export default ParticipantesPage;

