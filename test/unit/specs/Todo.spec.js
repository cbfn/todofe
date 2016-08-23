import Vue from 'vue';
import Todo from 'src/components/Todo';

describe('Todo.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><todo></todo></div>',
      components: { Todo },
    }).$mount();
    expect(vm.$el.querySelector('.todo h1').textContent).to.contain('Task list!');
  });
});
