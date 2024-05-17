import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import SimonVygotsky from './Utils/Vygotsky.jpg';
import CardConModal from './ModalPrincipal';
const ContenidoPrincipal = () => 
{
    return (
        <>
        <Container className='p-5'>
        <Row>
        <Col>
        <img
            src= {SimonVygotsky} // Ruta del Logo
            width="248"   // Establece el ancho del logo
            height="305"  // Establece la altura del logo
            className="align-right mx-3 rounded" // Añade margen a la derecha si es necesario
            alt="Imagen de Simon Vygostky"/>
        </Col>
        <Col>
        <div className='p-1' style={{ textAlign: "justify" }}>
        ¡Hola a todos! Les presento nuestro último proyecto: una aplicación web diseñada especialmente para impulsar el desarrollo de habilidades blandas como la comunicación y el trabajo en equipo. Esto no es solo para el ámbito académico, sino también te servira para el laboral y personal.
        </div>
        <div className='p-1' style={{ textAlign: "justify" }}>
        Utilizamos un enfoque súper interesante basado en los 13 tipos de aprendizaje, el modelo VAK y, por supuesto, la famosa Zona de Desarrollo Próximo (ZDP) de Vygotsky. Hablando de Vygotsky, su teoría realmente nos inspira, porque pone énfasis en cómo el aprendizaje social precede al desarrollo individual. Nuestra plataforma aprovecha esta idea para adaptar el material educativo a tu nivel actual, asegurando que siempre estés avanzando desde donde estás.
        </div>
        <div  className='p-1'style={{ textAlign: "justify" }}>
        Además, tenemos un sistema de emparejamiento, basado en el algoritmo de Gale y Shapley, que optimiza cómo te conectas con otros usuarios. Esto facilita encontrar compañeros de estudio que realmente complementen tu estilo de aprendizaje y te ayuden a mejorar.
        </div>
        </Col>
       </Row>
      </Container>

      <Container>
        <div><h3>Más sobre <span>habilidades blandas</span></h3></div>
      </Container>

      <Container className="mt-4 pb-3">
      <Row>
          <Col md={3} className="d-flex align-items-stretch">
          <CardConModal className="mb-3 d-flex"
          title="Responsabilidad" 
          text="¿Cómo se manifiestan la autodisciplina y el sentido común en el contexto profesional y académico?" 
          fullText="Se ve reflejada en la puntualidad tanto en la asistencia a una reunión como en la entrega de los trabajos pactados; la autodisciplina, trabajo a consciencia y el sentido común."
        />

          </Col>
          <Col md={3} className="d-flex align-items-stretch">
          <CardConModal className="mb-3 d-flex"
          title="Optimismo" 
          text="¿Cómo cambiaría tu experiencia escolar si siempre vieras el lado positivo de las cosas?" 
          fullText="El optimismo es una habilidad blanda esencial que puede transformar tu experiencia escolar. En lugar de ver los desafíos académicos como obstáculos insuperables, un estudiante optimista los percibe como oportunidades para aprender y crecer. Esta mentalidad positiva no solo mejora tu rendimiento académico, sino que también te ayuda a mantener la calma y la concentración durante los exámenes y tareas difíciles. Además, el optimismo puede mejorar tus relaciones con compañeros y profesores, ya que una actitud positiva y esperanzadora es contagiosa y puede inspirar a otros a adoptar una perspectiva similar. En resumen, el optimismo no solo te hace sentir mejor en el día a día, sino que también te prepara para enfrentar y superar cualquier desafío que la escuela te presente."
        />

          </Col>
          <Col md={3} className="d-flex align-items-stretch">
          <CardConModal className="mb-3 d-flex"
          title="Motivación" 
          text="¿Qué te impulsa a seguir adelante y dar lo mejor de ti en la escuela?" 
          fullText="La motivación es el motor que te impulsa a esforzarte y alcanzar tus metas académicas. Es la fuerza que te ayuda a levantarte temprano para estudiar, a dedicar horas a tus tareas y a participar activamente en clase. La motivación puede ser intrínseca, naciendo de tu propio interés y pasión por aprender, o extrínseca, influenciada por el deseo de obtener buenas calificaciones, reconocimiento o incluso recompensas de tus padres o profesores. Identificar y nutrir tu fuente de motivación es crucial para mantener un alto nivel de compromiso y dedicación en tus estudios. "
        />
          </Col>
          
          <Col md={3} className="d-flex align-items-stretch">
          <CardConModal className="mb-3 d-flex"
          title="Flexibilidad" 
          text="
          ¿Qué implica la capacidad de adaptabilidad en un entorno laboral y cómo se relaciona con el aprendizaje autónomo y la disposición al cambio?" 
          fullText="Se refiere a la capacidad para adaptarse a los cambios, estar dispuesto a cambiar la forma de trabajo y aprender de manera autónoma para adaptarse."
        />
          </Col>
        </Row>
      </Container>
      </>
    );
}

export default ContenidoPrincipal;
