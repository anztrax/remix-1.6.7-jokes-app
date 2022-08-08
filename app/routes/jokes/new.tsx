import React from 'react';
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from '@remix-run/node';
import { useActionData } from '@remix-run/react';

import { db } from '~/utils/db.server';

function validateJokeContent(content: string){
  if(content.length < 10){
    return `That Joke is too short`;
  }
}

function validateJokeName(name: string){
  if(name.length < 3){
    return `That joke's name is too short`;
  }
}

type ActionData = {
  formError?: string;
  fieldErrors? : {
    name: string | undefined,
    content: string | undefined
  },
  field?: {
    name: string,
    content: string
  }
}

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name');
  const content = form.get('content');

  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!

  if(
    typeof name !== 'string' ||
    typeof content !== 'string'
  ){
    throw new Error('Form not submitted correctly.');
  }

  const fields = { name, content };

  const joke = await db.joke.create({ data: fields });
  return redirect(`/jokes/${joke.id}`);
}

export default function NewJokeRoute(){
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method={'post'}>
        <div>
          <label>
            Name: <input type={'text'} name={'name'} />
          </label>
        </div>
        <div>
          <label>
            Content: <textarea name={'content'} />
          </label>
        </div>
        <div>
          <button type={'submit'} className={'button'}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
