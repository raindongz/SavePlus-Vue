<template>
    <div class="nav">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-md bg-dark navbar-dark">
                    <a href="#" class="navbar-brand">MENU</a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto">
                            <router-link to="/" class="nav-item nav-link">Home</router-link>
                            <a href="" class="nav-item nav-link">Products</a>
                            <a href="" class="nav-item nav-link">Product Detail</a>
                            <router-link to="/wishlist" class="nav-item nav-link">Wishlist</router-link>

                            <router-link to="/Visiting" class="nav-item nav-link">Visiting</router-link>

                            <div class="nav-item dropdown">
                            
                                <div class="dropdown-menu">
                                    <router-link to="/wishlist" class="nav-item nav-link">Wishlist</router-link>
                                    <a href="" class="dropdown-item">Login & Register</a>
                                    <a href="" class="dropdown-item">Contact Us</a>
                                </div>
                            </div>
                        </div>
                        <div class="navbar-nav ml-auto">
                            <div class="nav-item dropdown">
                                <router-link to="/myaccount" class="nav-item nav-link">My account</router-link>
                                <div class="dropdown-menu">
                                    <a href="#" class="dropdown-item">Login</a>
                                    <a href="#" class="dropdown-item">Register</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
</template>
<script>
export default {
    /* eslint-disable vue/multi-word-component-names */
    name:"NavBar"
}
</script>