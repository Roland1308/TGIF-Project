<template>
    <nav>
        <div class="d-flex mb-2">
          <router-link to="/" class="navbar-brand p-2 mr-auto"><img src="../assets/MyTgif.jpg"
              alt="Transparent Government in Fact" width="500" /></router-link>
          <p class="p-2 align-self-center">
            <a href="mailto:info@tgif.net"><img src="../assets/emailus.png" alt="Transparent Government in Fact"
                width="150" /></a>
          </p>
        </div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact>Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a data-toggle="dropdown" class="nav-link dropdown-toggle" href="#">Congress 113</a>
            <div class="dropdown-menu">
              <router-link to="senatedata" exact class="dropdown-item">Senate</router-link>
              <router-link to="housedata" exact class="dropdown-item">House</router-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a data-toggle="dropdown" class="nav-link dropdown-toggle" href="#">Attendance</a>
            <div class="dropdown-menu">
              <router-link to="senateattendance" exact class="dropdown-item">Senate</router-link>
              <router-link to="houseattendance" exact class="dropdown-item">House</router-link>
            </div>
          </li> 
          <li class="nav-item dropdown">
            <a data-toggle="dropdown" class="nav-link dropdown-toggle" href="#">Party Loyalty</a>
            <div class="dropdown-menu">
              <router-link to="senateparty" exact class="dropdown-item">Senate</router-link>
              <router-link to="houseparty" exact class="dropdown-item">House</router-link>
            </div>
          </li>
        </ul>
    </nav>   
</template>

<script>
  export default {
    name: 'appheader'
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
