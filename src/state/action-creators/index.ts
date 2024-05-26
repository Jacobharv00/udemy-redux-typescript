import axios from "axios";
import {ActionType} from "../action-types";

import type {Dispatch} from 'redux'
import type {Action} from '../actions'

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES
    })
    
    try {
      const {data} = await axios.get('https://registry.npmjs.org/-/v1/search', {
        params: {
          text: term
        }
      })
      const names: string[] = data.objects.map((result: any) => {
        return result.package.name
      })
      
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
        payload: names
      })
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.SEARCH_REPOSITORIES_ERROR,
          payload: err.message,
        });
      } else {
        dispatch({
          type: ActionType.SEARCH_REPOSITORIES_ERROR,
          payload: 'Sorry, something went wrong',
        });
      }
    }
  }
}