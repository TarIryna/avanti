import { styles } from "@/data";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const SelectContainer = styled.div`
  font-weight: 400;
  font-size: 16px;
  padding: 0px 16px;
  height: 40px;
  position: relative;
  left: -2px;
  &:focus {
  outline: none;
  box-shadow: none; /* иногда тень добавляется для контура */
  border-color: initial; /* если нужно убрать изменение цвета рамки */
}
`
export const Input = styled.input`
  width: 100%;
  display: block;
  height: calc(100% - 2px);
  padding: 0 16px;
  position: absolute;
  top: 50%;
  left: 2px;
  transform: translate3d(0, -50%, 0);
  z-index: 1;
  ${({isOpenList}) => ( isOpenList ? 'border-radius: 16px 16px 0 0;' : 'border-radius: 16px;')}
  border: 1px solid grey;
  /* visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")}; */
  &:focus {
    outline: none;
  }
`;

export const Label = styled.div`
    position: absolute;
    top: 0;
    left: 18px;
    font-size: 8px;
    z-index: 2;
`

export const Select = styled.div`
  position: absolute;
  z-index: 1;
`

export const OptionsList = styled.div`
 position: absolute;
 z-index: 3;
 top: calc(-100% + 77px);
 left: 2px;
 background: white;
 border-radius: 0 0 16px 16px;
 width: 100%;
 border: 0.5px solid grey;
 padding: 10px 0;
 max-height: 250px;
 overflow-y: auto;
`

export const Option = styled.div`
  padding: 0 20px;
  cursor: pointer;
  display: flex;
  gap: 5px;
`

export const NoOptions = styled.div`
padding: 0 20px;`

export const SelectButton = styled.button`
  position: absolute;
  z-index: 2;
  display: flex;
  width: 100%;
  height: calc(100% - 2px);
  padding: 0 16px;
  top: 50%;
  left: 2px;
  transform: translate3d(0, -50%, 0);
  z-index: 1;
   ${({isOpenList}) => ( isOpenList ? 'border-radius: 16px 16px 0 0;' : 'border-radius: 16px;')}
  border: 1px solid grey;
`

export const CheckIcon = styled.div``

export const SelectWrapper = styled.div``

export const TagsContainer = styled.div`
   position: absolute;
   top: 50%;
   left: 2px;
   transform: translate3d(0, -50%, 0);
   z-index: 2;
   display: flex;
   gap: 5px;
   padding: 0 16px;
`

export const Tag = styled.div`
  display: flex;
  gap: 5px;
`

export const RemoveTagBtn = styled.div`
  cursor: pointer;
`

export const Selected = styled.div`
  font-size: 12px;
  padding: 0 2px;
`