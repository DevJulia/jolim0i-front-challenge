import SearchResults from '@/components/search/SearchResults'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { capitalize } from '@/services/filters.js'

//Create local vue to load global filters
const localVue = createLocalVue();
localVue.filter('capitalize', capitalize);

const propsData = {
  products: [
    {brand: 'Dermalogica', name: 'Pure Light SPF50', ingredient_list: 'A, B, C'},
    {brand: 'Manucurist', name: 'Green Carnation', ingredient_list: 'A, B, C'},
    {brand: 'Absolution', name: 'La Trousse Absolution', ingredient_list: 'A, B, C'}
  ],
  usedKeyword: 'cream'
};

describe('SearchResults', () => {
  it('displays a list of product', () => {
    //1. Define props
    const wrapper = shallowMount(SearchResults, {
      localVue,
      propsData: propsData
    })

    //2. Check if it displays all the products
    const list = wrapper.findAll('li');
    expect(list).toHaveLength(wrapper.props().products.length);

    //3. Check if a list item displays all required information
    list.wrappers.forEach((listWrapper, index) => {
      const props = wrapper.props().products[index];
      expect(listWrapper.text()).toContain(props.brand);
      expect(listWrapper.text()).toContain(props.name);
      expect(listWrapper.text()).toContain(props.ingredient_list);
    })
  })


  it('does not show any ingredient by default', () => {
    const wrapper = shallowMount(SearchResults, {
      localVue,
      propsData: propsData
    })

    const ingredientLists = wrapper.findAll('[data-testid="ingredient-list"]');
    ingredientLists.wrappers.forEach(ingredientListWrapper => {
      expect(ingredientListWrapper.element.style.display).toBe('none');
    })
  })


  it('shows the ingredients when the user clicks on the product brand', async () => {
    const wrapper = shallowMount(SearchResults, {
      localVue,
      propsData: propsData
    })

    //1. User clicks on product brand
    wrapper.find('[data-testid="product-name"]').trigger('click');
    await wrapper.vm.$nextTick();
    
    //2. Check if ingredients are visible
    const ingredientList = wrapper.find('[data-testid="ingredient-list"]');
    expect(ingredientList.element.style.display).not.toBe('none');
  })


  it('hides the ingredients when the user clicks on the selected product', async () => {
    const wrapper = shallowMount(SearchResults, {
      localVue,
      propsData: propsData
    })
    wrapper.setData({ selectedProduct: 0 })

    //1. User clicks on the selected product
    wrapper.find('[data-testid="product-name"]').trigger('click');
    await wrapper.vm.$nextTick();

    //2. Ingredients are not visible
    const ingredientList = wrapper.find('[data-testid="ingredient-list"]');
    expect(ingredientList.element.style.display).toBe('none');
  })


  it('shows only one ingredient list at a time', async () => {
    const wrapper = shallowMount(SearchResults, {
      localVue,
      propsData: propsData
    })
    wrapper.setData({ selectedProduct: 0 })

    //1. User clicks on another product
    wrapper.findAll('[data-testid="product-name"]').at(1).trigger('click');
    await wrapper.vm.$nextTick();

    //2. The previous product's ingredients are hidden and the newly selected products' ingredients are visible
    const previousProduct = wrapper.findAll('[data-testid="ingredient-list"]').at(0);
    const selectedProduct = wrapper.findAll('[data-testid="ingredient-list"]').at(1);
    
    expect(previousProduct.element.style.display).toBe('none');
    expect(selectedProduct.element.style.display).not.toBe('none');
  })
  

  it('displays the user\'s search keywords', () => {
    const wrapper = shallowMount(SearchResults, {
      localVue,
      propsData: propsData
    })

    const resultData = wrapper.find('[data-testid="results-data"]');
    expect(resultData.text()).toContain(wrapper.props().usedKeyword);
  })

  it('shows total number of products', () => {
    const wrapper = shallowMount(SearchResults, {
      localVue,
      propsData: propsData
    })

    const resultData = wrapper.find('[data-testid="results-data"]');
    expect(resultData.text()).toContain(wrapper.props().products.length);
  })

  it('shows different messages according to the number of products', () => {
    const wrapper = shallowMount(SearchResults, {
      localVue,
      propsData: propsData
    })

    // Results > 1
    const plural = wrapper.find('[data-testid="results-data"]');

    // Unique result
    wrapper.setProps({
      products: [
        {brand: 'Absolution', name: 'La Trousse Absolution', ingredient_list: 'A, B, C'}
      ],
      usedKeyword: 'cream'
    })
    const unique = wrapper.find('[data-testid="results-data"]');

    // No result
    wrapper.setProps({
      products: [],
      usedKeyword: 'cream'
    })
    const noResult = wrapper.find('[data-testid="results-data"]');

    expect(plural.text()).not.toBe(unique);
    expect(plural.text()).not.toBe(noResult);
    expect(noResult.text()).not.toBe(unique);
  })
})