<template>
    <tr>
      <td>
        
      </td>
      <td>{{ item.price }}</td>
      <td>{{ item.quantity }}</td>
      <td><button @click="$emit('add-to-cart', item)">Add to Wishlist</button></td>
      <td><button @click="$emit('remove', item.id)">Remove</button></td>
    </tr>
  </template>
  
  <script>
  export default {
    /* eslint-disable vue/multi-word-component-names */
    name: 'ProductItem',
    props: ['item'],
  }
  </script>
  
  <style scoped>
  
  </style>
  