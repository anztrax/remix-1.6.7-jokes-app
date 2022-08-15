import React from "react";
import type {
  ChangeEventHandler
} from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { charCountStateSelector, textStateAtom } from "~/store/recoil/recoil_state";
import Input from 'antd/lib/input';

function TextInput(){
  const [ text, setText ] = useRecoilState(textStateAtom);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
  }

  return (
    <div>
      <Input type="text" value={text} onChange={onChange} />
      <br />
      <div>Echo: {text}</div>
    </div>
  )
}

function CharacterCounter(){
  const count = useRecoilValue(charCountStateSelector);
  return (
    <div>
      Character Count: {count}
    </div>
  );
}

export default function RecoilContainer(){
  return (
    <div>
      <CharacterCounter />
      <TextInput />
    </div>
  );
}
