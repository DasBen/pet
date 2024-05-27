import {useEffect} from 'react'
import {Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const search = window.location.search
    const params = new URLSearchParams(search)
    const token = params.get('token')

    if (token) {
      localStorage.setItem('session', token)
      toast.success('You have been logged in.')
      navigate('/customer')
    }
  }, [navigate])

  return (
    <Container fluid>
      <h1>Home</h1>
      <p>
        Quia ut blanditiis eos ut amet accusantium tempora a. Fugiat sed ut ut molestiae aut.
        Debitis delectus accusantium iure veniam qui non magnam nemo provident. Aut ut voluptatem
        dolorem soluta. Porro autem velit illo. Possimus harum omnis. Laudantium unde eligendi nam
        odio temporibus quia ut qui omnis. Et et beatae culpa est ab. Cupiditate laudantium totam
        consectetur minus error dolores sed modi et. Voluptas sunt est dolor inventore sit
        perferendis voluptatibus quaerat. Autem voluptates numquam cum quia qui et. Pariatur qui
        quis. Rerum nisi provident. Voluptate voluptatem nam. Dolorem nisi aut hic officia
        consequatur cumque qui libero. Qui rerum numquam sit mollitia. Quia ex delectus at odio
        reiciendis cum accusamus quod inventore.
      </p>
    </Container>
  )
}
