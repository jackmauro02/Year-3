using UnityEngine;

public class JackNoMove : MonoBehaviour
{
    public float maxHealth = 100f;
    //public Transform weaponSpawnPoint;
   // public GameObject weaponPrefab;
    //public LogicScript logic;

    private float currentHealth;
    public float damageVal = 20f;
    public LogicScript logic;
    public Zombie zombie;

    private void Start()
    {
        zombie = GameObject.FindGameObjectWithTag("Enemy").GetComponent<Zombie>();
        logic = GameObject.FindGameObjectWithTag("Logic").GetComponent<LogicScript>();
        currentHealth = maxHealth;
        //UpdateHealthHUD();
        //logic = GameObject.FindGameObjectWithTag("Logic").GetComponent<LogicScript>();
        //Jackfps = GameObject.FindGameObjectWithTag("Player").GetComponent<Jackfps>();
        // Instantiate the weapon at the spawn point
        //InstantiateWeapon();
    }

    private void Update()
    {
       
        // if (Input.GetMouseButtonDown(0))
        // {
        //     Shoot();
        // }

        if (Input.GetKeyDown(KeyCode.E))
        {
            if (currentHealth > 0)
            {
            TakeDamage(damageVal);
            Debug.Log("current health " + currentHealth);
            }
        }

        if (Input.GetKeyDown(KeyCode.F))
        {
            if (currentHealth < maxHealth)
            {
            Healing(damageVal);
            Debug.Log("current health " + currentHealth);
            }
        }
    }

    // Method to handle receiving damage
    public void TakeDamage(float damage)
    {
        if (currentHealth > 0)
        {
        currentHealth -= damage;
        // Update the HUD
        logic.removeHealth(damage);
        }
        // Update the HUD
        //UpdateHealthHUD();

        // Check if the player is dead
        if (currentHealth <= 0)
        {
            Die();
        }
        
    }

    public void Healing(float heal)
    {

        //Update the HUD
        //UpdateHealthHUD();

        // Check if the player is dead
        if (currentHealth < maxHealth)
        {
            currentHealth += heal;
            // Update the HUD
            logic.addHealth(heal);
        }
    }

    private void Die()
    {
        // You can add death-related logic here, like playing death animation or ending the game
        Debug.Log("Player has died!");
    }

    public float GetHealthValue()
    {
        Debug.Log("current health " + currentHealth);
        return currentHealth;
    }
    public float startHealth()
    {
        Debug.Log("Start health: " + maxHealth);
        return maxHealth;
    }

    // Method to handle shooting
    // private void Shoot()
    // {
    //     // Instantiate and configure the weapon
    //     GameObject weapon = Instantiate(weaponPrefab, weaponSpawnPoint.position, weaponSpawnPoint.rotation);
    //     weapon.transform.SetParent(transform); // Set the player as the parent
    // }

    // // Instantiate the weapon at the spawn point
    // private void InstantiateWeapon()
    // {
    //     GameObject weapon = Instantiate(weaponPrefab, weaponSpawnPoint.position, weaponSpawnPoint.rotation);
    //     weapon.transform.SetParent(transform); // Set the player as the parent
    // }


}
