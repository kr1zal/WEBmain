interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'My First Project',
    description: `This is a placeholder for your amazing project.`,
    imgSrc: '/static/images/project-placeholder.png', // Замени потом картинку
    href: '#',
  },
]

export default projectsData
