<script lang="ts"></script>

<nav class="navigation">
  <ul>
    <li>
      <button>Logout</button>
    </li>
  </ul>
</nav>

<style>
  .navigation {
    display: flex;
    padding: 1rem 1.5rem;
    & ul {
      margin: 0;
      display: flex;
      flex-direction: row;
      list-style: none;
      padding: 0;
      margin-left: auto;
    }

    & button {
      font-size: 2.5rem;
      text-decoration: none;
      background: none;
      border: none;
      color: #fff;
    }
  }
</style>
