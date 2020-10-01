import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/40242040?s=460&u=254c58d9dc1578d0a8baa9639c8248c87a86a80b&v=4" alt="Lucas Oliveira" />
                <div>
                    <strong>Lucas Oliveira</strong>
                    <span>Lingua Portuguesa</span>
                </div>
            </header>

            <p>
                Entusiasta em ensinar lingua portuguesa, de forma avançada.
                        <br /><br />
                        Apaixonado por ensinar lingua portuguesa a todos os públicos tendo a melhor experiência.
                    </p>

            <footer>
                <p>
                    Preço/Hora
                            <strong>R$ 95,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                            Entrar em contato
                        </button>
            </footer>
        </article>
    )
}

export default TeacherItem