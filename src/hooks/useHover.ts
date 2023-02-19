import { useEffect, useRef, useState } from 'react'

type THover<T extends HTMLElement> = [React.RefObject<T>, boolean]
/**
 * Hook to detect when the user hovers over an element.
 * @returns {[React.RefObject<T>, boolean]} A tuple with the ref that must be given to the element to observe and the current hover state.
 */
export const useHover = <T extends HTMLElement>(): THover<T> => {
  const [hovered, setHovered] = useState<boolean>(false)
  const ref = useRef<T>(null)
  useEffect(() => {
    const handleMouseOver = (): void => setHovered(true)
    const handleMouseOut = (): void => setHovered(false)
    const node = ref && ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)
      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [ref])
  return [ref, hovered]
}
