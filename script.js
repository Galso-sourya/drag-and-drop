const draggables = document.querySelectorAll('.draggable')//1.both of them
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {//2.we are looping through each one-1,2,3,4
  draggable.addEventListener('dragstart', () => {//3.
    //4.console.log("drag start")
    draggable.classList.add('dragging')//5.
  })

  draggable.addEventListener('dragend', () => {//6.full.once we release the cursor,the drag will end and 
    //this will be triggered
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {//7.
  container.addEventListener('dragover', e => {//8.
    //9.console.log("drag over")
    e.preventDefault()//12.by default, drop in inside an element is disabled.to enable it....after this line,
    //we will get allowed cursor sign while dropping. but outside the container, it is still not allowed
    const afterElement = getDragAfterElement(container, e.clientY)//16.e.clientY just gives the position of
    //the mouse
    //24.console.log(afterElement)
    const draggable = document.querySelector('.dragging')//10.the element which we are currently dragging
    if (afterElement == null) {//25.
      container.appendChild(draggable)//11.
    } else {//26.full.staying in the draggable position
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {//13.this function will determine the order after dragging.it is
  //taking the mouse position as y.if the mouse is near 4,it will return 4 .like that. if at the end,
  //it will return nothing,it will append at the end the element.
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]//14.it catches all
  //the elements in a container except the one what we are dragging.we are using spreading operator ....
  //to make a array out of it. class selector of draggable

  return draggableElements.reduce((closest, child) => {//15.this will loop through the whole list and 
    //determine which element is just after the mouse.we are getting the value of y from the event.
    const box = child.getBoundingClientRect()//17.
    //18.console.log(box) it gives a rectangle
    const offset = y - box.top - box.height / 2//19.distance between the mouse and centre of our box
    //20.console.log(offset) when we are above the element we get negative number and when we are below an element,
    //we get a positive number.if we are at the bottom most, we will get all positive numbers.
    if (offset < 0 && offset > closest.offset) {//21.it must be close to 0 also.as close to 0 as possible
      return { offset: offset, element: child }//22.
    } else {//23.full
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element//16.
}