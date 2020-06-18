<template>
  <div class="posts">
    <div class="posts-create-section">
      <h1>Create a new Category!</h1>
      <button
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal1"
        @click="createCategoryBtnClick"
      >Create Category</button>
    </div>
    <div class="all-posts">
      <h1>All Categories</h1>

      <div>
        <div class="card" v-for="(item, index) in categories" :key="index">
          <div class="card-header">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-primary" @click="editCat(index)">Edit</button>
              <button type="button" class="btn btn-danger" @click="deleteCat(index)">Delete</button>
            </div>
          </div>
          <div class="card-body">
            <p>
              <strong>Title: {{ item.title }}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal1"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLabel"
              v-if="editableCatId === null"
            >Create a new Catagory</h5>
            <h5 class="modal-title" id="exampleModalLabel" v-else>Edit Category</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                name="title"
                v-model="catagoryForm.title"
                placeholder="Catagory"
                class="form-control"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="handleCatCreation"
              v-if="editableCatId === null"
            >Create</button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="handleCatUpdation(editableCatId)"
              v-else
            >Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  data: () => {
    return {
      categories: [],
      catagoryForm: {
        title: ""
      },
      editableCatId: null
    };
  },
  created() {
    this.categories = JSON.parse(localStorage.getItem("cats")) || [];
  },
  methods: {
    onButtonClick() {
      $("#exampleModal1").modal({
        backdrop: false,
        focus: true,
        show: true
      });
    },
    handleCatCreation() {
      const cat = {
        title: this.catagoryForm.title
      };
      const savedCats = JSON.parse(localStorage.getItem("cats")) || [];
      localStorage.setItem("cats", JSON.stringify([...savedCats, cat]));
      this.categories = [...(this.categories || []), cat];
      $("#exampleModal1").modal("toggle");
    },
    createCategoryBtnClick() {
      this.editableCatId = null;
      this.catagoryForm = {
        title: ""
      };
    },
    editCat(id) {
      this.editableCatId = id;
      const cat = this.categories[id];
      this.catagoryForm = {
        title: cat.title
      };
      $("#exampleModal1").modal("toggle");
    },
    handleCatUpdation(id) {
      const cats = [...this.categories];
      cats[id] = {
        ...this.catagoryForm
      };
      this.categories = cats;
      localStorage.setItem("cats", JSON.stringify(cats));
      $("#exampleModal1").modal("toggle");
    },
    deleteCat(id) {
      const cats = [...this.categories];
      cats.splice(id, 1);
      this.categories = cats;
      localStorage.setItem("cats", JSON.stringify(cats));
    }
  }
};
</script>

<style scoped>
.posts {
  margin-top: 50px;
}
.posts-create-section {
  margin-bottom: 20px;
}
</style>
