import { TestBed, inject } from '@angular/core/testing';
import {Todo} from './todo';
import { TodoDataService } from './todo-data.service';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });

  it('should ...', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTodos()', () => {

    it('should return an empty array by default', inject([TodoDataService],
      (service: TodoDataService) => {
        expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: false});
        let todo2 = new Todo({title: 'Task 2', complete: true});
        service.addTodo(todo1);
        service.addTodo(todo2);
        expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#save(todo)', () => {
    it('should automatically assign an incremental id', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: false});
        let todo2 = new Todo({title: 'Task 2', complete: true});
        service.addTodo(todo1);
        service.addTodo(todo2);
        expect(service.getTodoById(1)).toEqual(todo1);
        expect(service.getTodoById(2)).toEqual(todo2);
      }
    ));
  });

  describe('#deleteTodoById(id)', () => {
    it('should remove todo with corresponding id', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: false});
        let todo2 = new Todo({title: 'Task 2', complete: true});
        service.addTodo(todo1);
        service.addTodo(todo2);
        expect(service.getAllTodos()).toEqual([todo1, todo2]);

        service.deleteTodoById(1);
        expect(service.getAllTodos()).toEqual([todo2]);
        service.deleteTodoById(2);
        expect(service.getAllTodos()).toEqual([]);
      }
    ));
    it('should not removing anything if todo corresponding id is not found', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: false});
        let todo2 = new Todo({title: 'Task 2', complete: true});
        service.addTodo(todo1);
        service.addTodo(todo2);

        expect(service.getAllTodos()).toEqual([todo1, todo2]);
        service.deleteTodoById(3);
        expect(service.getAllTodos()).toEqual([todo1, todo2]);
      }
    ));
  });

  describe('#updateTodoByID(id, values)', () => {
    it('should return todo with corresponding id and updated data', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: false});
        let todo1update = {title: 'Task 1 Updated', complete: true};
        service.addTodo(todo1);

        let result = service.updateTodoByID(1, todo1update);

        expect(result.title).toEqual(todo1update.title);
        expect(result.complete).toEqual(todo1update.complete);
      }
    ));
    it('should return null if todo is not found', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: false});
        let todo1update = {title: 'Task 1 Updated', complete: true};
        service.addTodo(todo1);
        expect(service.updateTodoByID(2, todo1update)).toEqual(null);
      }
    ));
  });

  describe('#toggleTodoComplete(todo)', () => {
    it('should return the updated todo with inverse complete status', inject([TodoDataService],
      (service: TodoDataService) => {
        let todo1 = new Todo({title: 'Task 1', complete: false});
        service.addTodo(todo1);
        let toggledTodo1 = service.toggleTodoComplete(todo1);
        expect(toggledTodo1.complete).toEqual(true);
      }
    ));
  });

});
